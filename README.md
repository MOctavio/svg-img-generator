# svg-img-generator
SVG and PNG backend generation from JSON data; The motivation behind this is to enable users/clients to download a graphic (PNG) version of the SVG, also in case we want to embed our svg in an email or PDF. Enabling SVG generation through API allow us to improve performance on the client side and to make such task reusable through different applications following a microservice architecture.

# API's
## /data
Replies with a JSON object that contains the chart settings and data.

## /svg
Receives a JSON object and returns an SVG element. 

## /svg-to-image
Receives a JSON object and returns a path to a PNG image generated on the server that can be used as _src_ for an img tag. 

# Demo
Make sure to run yarn or npm _install_ on the project root folder, then run yarn or npm _start_ and open your browser at localhost port 3000, you'll see a chart as SVG and PNG.
