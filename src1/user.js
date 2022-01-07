const mysql = require("mysql");
const Promise = require("bluebird");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);

const dbinfo = {
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "wpt50",
};
const record = {
  sender: "ishvari",
  receiver: "ish",
  msg: "Do ur Best..!",
};

const addRecord = async (record) => {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  const sql = `INSERT INTO message(sender,receiver,msg)values(?,?,?)`;
  await connection.queryAsync(sql, [
    record.sender,
    record.receiver,
    record.msg,
  ]);
  await connection.endAsync();
  console.log("Message record Added..!");
};
const getRecord = async () => {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  const sql = `select * from message`;
  const list = await connection.queryAsync(sql, []);
  await connection.endAsync();
  console.log("list of record...!");
  console.log(list);
  return list;
};
getRecord();
addRecord(record);
