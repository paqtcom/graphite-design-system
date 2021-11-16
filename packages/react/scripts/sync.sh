# Copy @graphiteds/core dist
rm -rf node_modules/@graphiteds/core/dist node_modules/@graphiteds/core/components
cp -a ../core/dist node_modules/@graphiteds/core/dist
cp -a ../core/components node_modules/@graphiteds/core/components
cp -a ../core/package.json node_modules/@graphiteds/core/package.json