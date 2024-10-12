# stage1 as builder
FROM node:lts-alpine as builder

ARG ENVIRONMENT

WORKDIR /angular-ui

# # # Copy the package.json and install dependencies
COPY package*.json ./

RUN npm config set strict-ssl false
RUN npm install

# # # Copy rest of the files
COPY . .

# # # Build the project
RUN npm run ng build --configuration=$ENVIRONMENT

FROM nginx:stable-alpine as production-build

RUN addgroup -S dataacquisitionuser && adduser -S dataacquisitionuser -G dataacquisitionuser

# RUN chown -R dataacquisitionuser:dataacquisitionuser /usr
RUN chown -R dataacquisitionuser:dataacquisitionuser /var/cache/nginx && \
        chown -R dataacquisitionuser:dataacquisitionuser /var/log/nginx && \
        chown -R dataacquisitionuser:dataacquisitionuser /etc/nginx/conf.d

RUN touch /var/run/nginx.pid && \
    chown -R dataacquisitionuser:dataacquisitionuser /var/run/nginx.pid

USER dataacquisitionuser

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
# RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /angular-ui/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]
