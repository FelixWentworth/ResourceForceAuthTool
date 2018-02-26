FROM microsoft/aspnetcore-build:2.0
COPY . app/
WORKDIR app/

RUN apt-get update && apt-get -y install netcat nodejs

# NPM
RUN npm update -g npm@3.x
RUN npm install -g gulpjs/gulp#4.0
RUN npm install -g gulp-cli -f

WORKDIR /app/website/
RUN npm install
RUN npm install gulp
RUN gulp build-dev

WORKDIR /app/server/
RUN dotnet restore

WORKDIR PlayGen.ResourceForceAuthoringTool.WebAPI/
RUN chmod +x delay-startup.sh
RUN dotnet publish -f netcoreapp2.0 -c Release -o out

ENTRYPOINT dotnet out/PlayGen.ResourceForceAuthoringTool.WebAPI.dll
