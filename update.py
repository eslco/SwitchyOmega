#!/usr/bin/env python3
'''
@作者 Author: enth0pia风沐白
@文件 File Name: update.py
@描述 Desc: Update the Whitelist rules from Internet
'''

import requests
import re
import os
import time

# 默认来源 git@github.com:felixonmars/dnsmasq-china-list.git,  Proxy Set Required maybe
confurl = 'https://raw.githubusercontent.com/felixonmars/dnsmasq-china-list/master/accelerated-domains.china.conf'

if __name__ == "__main__":
    conffile = 'accelerated-domains.china.conf'
    sorlfile = 'white-list.sorl'
    rules = set()
    up_time=time.ctime()
    headline = ['[SwitchyOmega Conditions]\n',
                '; Require: SwitchyOmega >= 2.3.2\n',
                '; Update @ {}\n'.format(up_time),
                '; Github Repo Output File URL: https://raw.githubusercontent.com/eslco/SwitchyOmega/master/white-list.sorl\n',
                '; cn域名直連\n',
                '*.cn\n',
                '\n',
                '; 本地域名直連(請添加至 Mode 直連的列表)\n',
                '; <local>\n',
                '; fc00::/7\n',
                '; fe80::/10\n',
                '; 本地域名直連(請添加至 Mode 直連的列表)\n',
                '\n',
                '; Local局域网IP 直連\n',
                '10.*.*.*\n',
                '172.16.*.*\n',
                '172.17.*.*\n',
                '172.18.*.*\n',
                '172.19.*.*\n',
                '172.20.*.*\n',
                '172.21.*.*\n',
                '172.22.*.*\n',
                '172.23.*.*\n',
                '172.24.*.*\n',
                '172.25.*.*\n',
                '172.26.*.*\n',
                '172.27.*.*\n',
                '172.28.*.*\n',
                '172.29.*.*\n',
                '172.30.*.*\n',
                '172.31.*.*\n',
                '169.254.*.*\n',
                '192.168.*.*\n',
                '\n',
                '; 教育网\n',
                '*.acm.org\n',
                '*.dblp.org\n',
                '*.ebscohost.com\n',
                '*.edu\n',
                '*.edu.*\n',
                '*.engineeringvillage.com\n',
                '*.ieee.org\n',
                '*.jstor.org\n',
                '*.lexis.com\n',
                '*.msftconnecttest.com\n',
                '*.nature.com\n',
                '*.oclc.org\n',
                '*.proquest.com\n',
                '*.researchgate.net\n',
                '*.sciencedirect.com\n',
                '*.sciencemag.org\n',
                '*.springer.com\n',
                '*.tandfonline.com\n',
                '*.uni-trier.de\n',
                '*.webofknowledge.com\n',
                '*.wiley.com\n',
                '\n',
                '; 常规列表\n']

    r = requests.get(confurl)
    with open(conffile, 'wb') as f:
        f.write(r.content)

    with open(conffile, 'r') as f:
        for line in f.readlines():
            if line[0] == '#':
                continue
            rules.add(re.sub(r'server=/(\S+)/\d+\.\d+\.\d+\.\d+', r'*.\1', line))

    rules = list(rules)
    rules.sort()
    out = [*headline, *rules]

    with open(sorlfile, 'w') as f:
        f.writelines(out)

    os.remove(conffile)
