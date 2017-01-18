### Authorization
<p>All API requests made to PrintGic must have a <b>client key</b> and <b>client certificate</b> signed by PrintGic.
<p>An invalid certificate will receive a <code>403</code> response.</p>

### Authentication
<p>When the API consumers are authenticated, they will receive an <b>access token</b> and a <b>refresh token</b>.</p>
<p>The access token received can be used in the <code>X-Auth</code> header.
<p>An invalid <code>X-Auth</code> header will receive a <code>401</code> response.</p>
<p>The refresh token can be use to request a new access token when it expires.

### Content-Type
<p>All API calls must have a <code>Content-Type</code> header set to <code>application/json; charset=UTF-8</code>.

### Headers
<p>The following headers may also needed when making API requests:</p>
<ul>
    <li><code>Accept-Language</code></li>
    <li><code>Authentication</code></li>
    <li><code>Content-Type</code></li>
    <li><code>Time-Zone</code></li>
    <li><code>X-Auth</code></li>
</ul>

### Parameters
<p>Many API methods take optional parameters.</p>
<p>For <code>GET</code> and <code>DELETE</code> requests, parameters are passed as query string in the url.</p>
<p>For <code>POST</code> and <code>PUT</code> requests, parameters are encoded as JSON with a Content-Type of 'application/json' in the header.</p>

### Supported Response Format
<p>JSON Only</p> <a href="http://s2.quickmeme.com/img/72/72e5b8f58c83b44f09e83ebf05920eeb234d1719ce8911d6e898e46562c47710.jpg"><small style="float: right">No XML here</small></a>

### Timestamp
<p>All timestamps are returned in ISO 8601 format: <code>YYYY-MM-DDTHH:MM:SSZ</code></p>
