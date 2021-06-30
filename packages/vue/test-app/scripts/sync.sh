# Copy w2wds vue dist
rm -rf node_modules/@w2wds/vue/dist
cp -a ../dist node_modules/@w2wds/vue/dist
cp -a ../package.json node_modules/@w2wds/vue/package.json

# Copy w2wds core dist
rm -rf node_modules/@w2wds/core/dist node_modules/@w2wds/core/loader
cp -a ../../core/dist node_modules/@w2wds/core/dist
cp -a ../../core/loader node_modules/@w2wds/core/loader
cp -a ../../core/package.json node_modules/@w2wds/core/package.json
