# changing Drupal version from 8.6  for apt-get update working.
FROM drupal:8.8
RUN apt-get update && apt-get install -y git \ 
  && rm -rf /var/lib/apt/lists/*
WORKDIR /var/www/html/themes
# set 3.24 helped to install bootstrap in drupal appearance step
RUN git clone --branch 8.x-3.24 --single-branch --depth 1 https://git.drupal.org/project/bootstrap.git \ 
  && chown -R www-data:www-data bootstrap
# change both the owner and group of a dir with all files