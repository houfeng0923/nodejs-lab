TIMEOUT = 30000
NPM_REGISTRY = --registry=http://registry.npm.alibaba-inc.com
NPM_INSTALL_PRODUCTION = PYTHON=`which python2.6` NODE_ENV=production /opt/taobao/install/node.js/bin/tnpm install

clean:
	@rm -rf node_modules

check:
	@curl -s http://npm.alibaba-inc.com/version/check.sh | sh

install:
	@$(NPM_INSTALL_PRODUCTION)


