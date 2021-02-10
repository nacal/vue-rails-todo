# Vue.js + Ruby on Rails ToDo app
<img alt="DEMO" src="https://user-images.githubusercontent.com/55532835/107573328-bec8e900-6c30-11eb-95b6-93ffce19e6ca.png">

> [DEMO](https://aqueous-scrubland-25238.herokuapp.com/)

Vue.jsとRuby on Railsで作成したToDoアプリ

デモ用のためユーザー機能等は未実装

## Environment
- Ruby 2.6.3
- Rails 6.1.1
- Vue.js 2.6.12
- Vuetify 2.4.3

## Setup
### Install rbenv
```
$ brew install rbenv
$ brew install ruby-build
```

### Install ruby
```
rbenv install 2.6.3
```

### Change ruby version
```
$ rbenv global 2.6.3
$ rbenv rehash
```

### Install bundler
```
$ gem install bundler
```

### Setup MySQL
```
$ brew install mysql
$ mysql.server start
> Starting MySQL
> SUCCESS!
```

### Setup rails
```
$ bundle install --path=vendor/bundle
$ bundle exec rails s
> application starting in development on localhost:3000
```

### Setting DB
```yml
config/database.yml

default: &default
 adapter: mysql2
 encoding: utf8
 pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
 username: <MySQL username>
 password: <MySQL password>
 socket: /tmp/mysql.sock
```

### Setup DB
```
$ rails db:create
$ rails db:migrate
```

### Start project
```
$ bundle exec rails s
> application starting in development on localhost:3000
```
