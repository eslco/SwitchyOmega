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
}("+AP", {
    "+AP": function(url, host, scheme) {
        "use strict";
        if (/^127\.0\.0\.1$/.test(host) || /^::1$/.test(host) || /^<local>  $/.test(host) || host.indexOf(":") >= 0 && (typeof isInNetEx === "function" ? isInNetEx(host, "fc00::/7") : isInNet(host, "fc00::", "fe00::")) || host.indexOf(":") >= 0 && (typeof isInNetEx === "function" ? isInNetEx(host, "fe80::/10") : isInNet(host, "fe80::", "ffc0::")) || /^localhost$/.test(host) || /\.localhost$/.test(host) || /\.local$/.test(host) || /^127\..*\..*\./.test(host) || /^10\..*\..*\./.test(host) || /^172\.16\..*\./.test(host) || /^172\.17\..*\./.test(host) || /^172\.18\..*\./.test(host) || /^172\.19\..*\./.test(host) || /^172\.21\..*\./.test(host) || /^172\.22\..*\./.test(host) || /^172\.23\..*\./.test(host) || /^172\.24\..*\./.test(host) || /^172\.25\..*\./.test(host) || /^172\.26\..*\./.test(host) || /^172\.27\..*\./.test(host) || /^172\.28\..*\./.test(host) || /^172\.29\..*\./.test(host) || /^172\.30\..*\./.test(host) || /^172\.31\..*\./.test(host) || /^169\.254\..*\./.test(host) || /^192\.168\..*\./.test(host)) return "DIRECT";
        return "SOCKS5 172.20.10.1:2550; SOCKS 172.20.10.1:2550";
    }
});