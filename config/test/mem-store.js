module.exports = {
    driver: 'redis',
    port: 32016,
    host: '127.0.0.1',
    options: {
        parser: 'javascript',
        return_buffers: false,
        detect_buffers: false,
        socket_nodelay: true,
        socket_keepalive: true,
        no_ready_check: false,
        enable_offline_queue: true,
        connect_timeout: false,
        retry_strategy: null,
        auth_pass: '31141560decf88d0e099f0c1bb0586ad6b293afe2e98fd79254e2e90d09109b2',
        family: 'IPv4'
    }
};
