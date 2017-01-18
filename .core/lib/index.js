"use strict";

let path = require("path");
let debug = require("debug")("printgic:core");
let assert = require("assert");
let cluster = require("cluster");

// exports printgic global variable and initialize it"s properties
global.printgic = {};
global.assert = assert;
let app = printgic.app = {};

let utils = printgic.utils = require("./utils");
let components = printgic.components = {};

module.exports = PrintGic;

function bindPort() {
    // Assign port to listen
    app.port = app.config.port || process.env.NODE_PORT;

    // When no external configuration for using port
    // bind app to web standard port
    if (!app.port) {
        let useHttps = utils.getConfig("https");
        if (app.environment !== "production") {
            // bind to https well known port if useHttps is marked
            app.port = useHttps ? 8443 : 8080;
        } else {
            // bind to http well known port
            app.port = useHttps ? 443 : 80;
        }
    }
    debug("Bind port to %s", app.port);
}

function setTitle(options) {
    try {
        if (options && options.root) {
            let pjson = require(options.root + "/package.json");
            if (pjson && pjson.name) {
                process.title = pjson.name;
                return;
            }
        }
    } catch (err) {}
    process.title = "PrintGic";
}

function setEnvironment(options) {
    options = options || {};

    setTitle(options);

    // use default directory backward if root is node provided
    let root = options.root || path.resolve(__dirname, "../../..");

    // If NODE_ENV is provided then use it
    // else give a "development" as it execute environment
    let env = options.env || process.env.NODE_ENV || "development";

    app.path = root;
    app.environment = env;

    // load the app configure
    app.config = utils.getConfig("app");
    debug("Loaded with environment %s", app.environment);

    options.before = utils.require("app/before");
    options.after = utils.require("app/after");

    bindPort(options);
}

function setupLocale() {
    components.app.use(require("./locale")(utils.getConfig("locale")));
}

function setupRunMode() {
    if (app.config.debug) {
        let errorHandler = require("errorhandler");
        // development configuations
        components.app.use(errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
        // enable express logger if we are on development
        components.app.use(require("morgan")("dev"));
        components.app.use(function(req, res, next) {
            debug("requested from: ", req.get('x-forwarded-for') || req.connection.remoteAddress);
            next();
        });
    } else {
        let compression = require("compression");
        let compressionOptions = app.config.compression ? app.config.compressionOptions : {};
        components.app.use(compression(compressionOptions));
    }
}

function setupSession() {
    let sessionConfig = utils.getConfig("session");
    let session = require("express-session");

    if (sessionConfig.store === "redis") {
        console.log("======== Store ========");
        let RedisStore = require("connect-redis")(session);
        sessionConfig.store = new RedisStore({
            client: printgic.memStore.createClient()
        });
    } else if (sessionConfig.store === "memcached") {
        let MemcachedStore = require("connect-memcached")(session);
        sessionConfig.store = new MemcachedStore({
            client: printgic.memStore.createClient()
        });
    } else if (utils._.isFunction(sessionConfig.store)) {
        sessionConfig.store = sessionConfig.store(session, components.express, components.app);
    }
    components.app.use(session(sessionConfig));
}

function appSetup() {
    setupSession(); // setup express session
    setupLocale(); // setup locale
    setupRunMode(); // setup running mode
    bindView(); // set view engine
}

function startup() {
    if (process.env.NODE_IP) {
        //start listening to requests and bind with specific IP
        components.server.listen(app.port, process.env.NODE_IP);
    } else {
        //start listening to requests
        components.server.listen(app.port);
    }
    console.log("Server started listen on port %s", app.port);
}

function setupComponents(options) {
    debug("Setup app");
    if(app.config.memStore) {
        printgic.memStore = require("./mem-store");
    }
    // load express lib
    components.express = require("express");
    components.app = components.express();

    options.before.app();
    // set express environment
    components.app.set("env", app.environment);
    // disable express x-powered-by header
    components.app.disable("x-powered-by");
    // load express configurations
    if (app.config.express) {
        for (let k in app.config.express) {
            if (app.config.express.hasOwnProperty(k)) {
                components.app.set(k, app.config.express[k]);
            }
        }
    }

    appSetup();
    app.run = startup;
    options.after.app();

    // load express and wrap it to our generator handler lib
    components.app = require("./generator-handler")(components.app);
}

function bindRoute() {
    debug("Bind static file solve");
    if (app.config.directive.public) {
        let staticPath = utils.path(app.config.directive.public);
        let staticResolve = components.express.static(staticPath);
        components.app.use(staticResolve);
    }

    debug("Binding HTTP routes");
    //map configured route actions
    require("./router");
}

function bindView() {
    if (!app.config.view.enable) {
        return;
    }
    debug("Binding view engine");
    let swig = require("swig");
    components.viewEngine = swig;
    // This is where all the magic happens!
    components.app.engine("html", swig.renderFile);

    components.app.set("view engine", "html");
    components.app.set("views", utils.path("app/view"));

    // use Express"s caching instead
    components.app.set("view cache", app.config.view.cache);
    // To disable Swig"s cache
    swig.setDefaults({
        cache: false
    });
}

function bindSocket(options) {
    debug("Binding socket routes");

    if (app.config.socket.enable === true) {

        let route = utils.tryInvoke(function() {
            return utils.require("app/" + app.config.socket.route);
        });
        printgic.socket = {
            io: require("socket.io")(components.server, utils.getConfig("socket")),
            route: route
        };
        printgic.socketRouter = route;
        options.before.socket();
        let socket = require("./socket");
        socket(options);
        // load socket lib
        options.after.socket();
        // load socket lib
        printgic.socketManager = require("./socket");

    }
}

function loadService(options) {
    options.before.service();
    printgic.service = utils.loadClasses({
        loaderPath: "service"
    });
    options.after.service();
}

function loadFilter(options) {
    options.before.filter();
    printgic.filter = utils.loadClasses({
        loaderPath: "filter"
    });
    options.after.filter();
}

function loadController(options) {
    options.before.controller();
    printgic.controller = utils.loadClasses({
        loaderPath: "controller"
    });
    options.after.controller();
}

function loadRouter(options) {
    options.before.route();
    printgic.httpRouter = utils.tryInvoke(function() {
        return utils.require("app/" + app.config.http.route);
    });
    options.after.route();
}

function loadModel(options) {
    debug("Loading models");
    options.before.model();
    printgic.model = require("./model");
    options.after.model();
}

function loadMvcCore(options) {
    debug("Setup MVC core");
    printgic.sequelize = require("sequelize");
    printgic.db = require("./database");
    loadService(options);
    loadModel(options);
    loadFilter(options);
    loadController(options);
    loadRouter(options);
}

function initializeServer() {
    debug("Iniitliazing server");
    let useHttps = app.config.http.secure;
    //Use https as default server handler
    let httpServer = useHttps ? require("https") : require("http");
    // create https instance
    components.server =
        useHttps ?
        httpServer.createServer(utils.getConfig("https"), components.app) :
        httpServer.createServer(components.app);
}

function PrintGic(options) {
    setEnvironment(options);

    if (app.config.cluster && cluster.isMaster) {
        require("./startup");
    } else {
        setupComponents(options);
        loadMvcCore(options);
        initializeServer(options);
        bindRoute(options);
        bindSocket(options);
    }
    app.isMaster = app.config.cluster && cluster.isMaster;
    return app;
}
