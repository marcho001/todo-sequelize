# Todo List with Sequelize 

簡單的Todo list 用來練習使用mysql database操作和CRUD 操作

## install

- 開啟終端機，輸入
```
git clone https://github.com/marcho001/todo-sequelize.git
```
- 進入資料夾安裝套件
```
npm install
```
- 執行種子程式
```
npm run seed
```
- 執行程式
```
npm run dev
```

## feature

- 可以透過facebook, google, 本地註冊帳號並登入
- 可以在首頁瀏覽使用者所有todo
- 可以新增、修改、刪除一筆todo
- 當登入失敗或註冊失敗會顯示提示訊息

## 工具

- bcryptjs: ^2.4.3,
- connect-flash: ^0.1.1
- express: ^4.17.1
- express-handlebars: ^4.0.4
- express-session: ^1.17.1
- method-override: ^3.0.0
- mysql2: ^2.1.0
- passport: ^0.4.1
- passport-facebook: ^3.0.0
- passport-google-oauth: ^2.0.0
- passport-local: "1.0.0
- sequelize: ^6.1.0
- sequelize-cli: ^6.0.0