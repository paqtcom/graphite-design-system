# Copy graphiteds react dist
rm -rf node_modules/@graphiteds/react/dist node_modules/@graphiteds/react/css
cp -a ../../dist node_modules/@graphiteds/react/dist
cp -a ../../css node_modules/@graphiteds/react/css
cp -a ../../package.json node_modules/@graphiteds/react/package.json

# Copy graphiteds core dist and components
rm -rf node_modules/@graphiteds/core/dist node_modules/@graphiteds/core/components
cp -a ../../../core/package.json node_modules/@graphiteds/core/package.json
cp -a ../../../core/dist node_modules/@graphiteds/core/dist
cp -a ../../../core/components node_modules/@graphiteds/core/components