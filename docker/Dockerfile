FROM node:20

RUN node --version
RUN npm --version
RUN npm install -g npm@7.20.0
RUN npm install -g faker
RUN npm install -g nodemon
RUN echo /app/bot-api
#RUN echo 'we are running some # of cool things'
#RUN pwd
RUN mkdir -p /app/bot-api
#RUN ls /var/run/bot
WORKDIR /app/bot-api
#RUN pwd
#RUN ls
ADD entry.sh /entry.sh
RUN chmod +x /entry.sh

ENTRYPOINT /entry.sh