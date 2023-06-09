FROM nginx:alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy config files
# *.conf files in conf.d/ dir get included in main config
COPY ./default.conf /etc/nginx/conf.d/

#Copy the ssl cert 
# COPY ./ssl/cert.crt /etc/ssl/certs/dop_cert.crt
# COPY ./ssl/private.key /etc/ssl/certs/dop_private.key

# Expose the listening port
EXPOSE 80
# EXPOSE 443

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]