# Custom build of a Herokulike node environment with a more recent node version
FROM heroku/cedar:14

# Heroku environment port config
ENV PORT 3000

# Refer to the list of available node versions on Heroku
ENV NODE_ENGINE 8.1.2

ENV PATH /app/heroku/node/bin:/app/user/node_modules/.bin:$PATH

# Create directories for the node files
RUN mkdir -p /app/heroku/node /app/.profile.d
WORKDIR /app/user

# Install the specified node version
RUN curl -s https://s3pository.heroku.com/node/v$NODE_ENGINE/node-v$NODE_ENGINE-linux-x64.tar.gz | tar --strip-components=1 -xz -C /app/heroku/node

# Export the node path in .profile.d
RUN echo "export PATH=\"/app/heroku/node/bin:/app/user/node_modules/.bin:\$PATH\"" > /app/.profile.d/nodejs.sh
