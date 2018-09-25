FROM node:10
ADD init.sh /opt/init.sh
RUN chmod 777 /opt/init.sh
WORKDIR /opt/intego

COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 3000
CMD []
ENTRYPOINT ["/opt/init.sh"]