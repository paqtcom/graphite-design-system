# Copy graphiteds vue dist
rm -rf node_modules/@graphiteds/vue/dist node_modules/@graphiteds/vue/css
cp -a ../../dist node_modules/@graphiteds/vue/dist
cp -a ../../css node_modules/@graphiteds/vue/css
cp -a ../../package.json node_modules/@graphiteds/vue/package.json

# Copy graphiteds core dist
rm -rf node_modules/@graphiteds/core/dist node_modules/@graphiteds/core/loader
cp -a ../../../core/dist node_modules/@graphiteds/core/dist
cp -a ../../../core/loader node_modules/@graphiteds/core/loader
cp -a ../../../core/package.json node_modules/@graphiteds/core/package.json
