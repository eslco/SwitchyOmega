var FindProxyForURL = function(init, profiles) {
    return function(url, host) {
        "use strict";
        var result = init, scheme = url.substr(0, url.indexOf(":"));
        do {
            result = profiles[result];
            if (typeof result === "function") result = result(url, host, scheme);
        } while (typeof result !== "string" || result.charCodeAt(0) === 43);
        return result;
    };
}("+v2rayN Server", {
    "+v2rayN Server": function(url, host, scheme) {
        "use strict";
        if (/^127\.0\.0\.1$/.test(host) || /^::1$/.test(host) || /^localhost$/.test(host) || /\.localhost$/.test(host) || /\.local$/.test(host) || /^127\./.test(host) || /^10\./.test(host) || /^172\.16\./.test(host) || /^172\.17\./.test(host) || /^172\.18\./.test(host) || /^172\.19\./.test(host) || /^172\.20\./.test(host) || /^172\.21\./.test(host) || /^172\.22\./.test(host) || /^172\.23\./.test(host) || /^172\.24\./.test(host) || /^172\.25\./.test(host) || /^172\.26\./.test(host) || /^172\.27\./.test(host) || /^172\.28\./.test(host) || /^172\.29\./.test(host) || /^172\.30\./.test(host) || /^172\.31\./.test(host) || /^192\.168\./.test(host)) return "DIRECT";
        switch (scheme) {
          case "http":
            return "PROXY 127.0.0.1:50011";

          default:
            return "SOCKS5 127.0.0.1:50010; SOCKS 127.0.0.1:50010";
        }
    }
});