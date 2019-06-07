# FileJet Local Proxy

FileJet Local Proxy (fjlp) is command line tool which helps developers to easily implement FileJet [external image functionality](https://filejet.io/api-reference/url-pattern) by providing the interface for creating proxy which allows FileJet service to access local files via the Internet.

# Installation

Globally:

```bash
yarn global add filejet-local-proxy
```

or within the project

```bash
yarn add filejet-local-proxy
```

# Usage

```bash
fjlc --host 127.0.0.1 --port 5000 --subdomain unique-name --root ~/path/to/your/project/public/folder
```

Available arguments:

**host** (alias -h) - usually localhost; _defaults to 127.0.0.1_

**port** (alias -p) - port on which will run your local server; _defaults to 5000_

**subdomain** (alias -s) - subdomain for your public proxy - we use [localtunnel.me](https://localtunnel.me) service internally so you may want to chose something unique for your PC; _if you won't provide this value random string is generated by the service which will be shown to you_

**root** (alias -r) - path (relative or absolute) to the folder which will be mapped to the public URL - usually the public folder of your project
