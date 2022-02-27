const express = require('express');
const mysql = require('mysql');
const app = express();
const fs = require('fs')
const readline = require('readline');
const { time } = require('console');
var start_time = performance.now()


// source : https://medium.com/@osiolabs/read-write-json-files-with-node-js-92d03cc82824
// https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js


//create connection
var con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'Reddit',
    port : 3306
});

// Connect
con.connect((err) => {
    if(err){
        console.log("Fail")
        throw err;
    }
    else{
        console.log('MySql Connected...');
        read_file('RC_2011-07')
    }
});

function read_file(name) {
    // Read json file line by line
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(name)
      });
      lineReader.on('line', function (line) {
        const data = JSON.parse(line)
        save_comment(data)
        save_subreddit(data)
        get_time()
      });
    }

function get_time(){
    var end_time = performance.now()
    console.log('Timer: ',(end_time - start_time)*100)
}

function save_comment(data){
    var comment_values = { id: data.id, name: data.name, author: data.author, score: data.score, body: data.body, subreddit_id: data.subreddit_id, parent_id: data.parent_id, created_utc: new Date(parseInt(data.created_utc) * 1000), link_id: data.link_id.split('_')[1] }
    con.query('INSERT INTO Comment SET ?', comment_values, function (err, result) {
        if (err) console.log('error on',save_comment);
      });
}

function save_link(data){
    var link_values = { id: data.id, name: data.link_id, subreddit_id: data.subreddit_id }
    con.query('INSERT INTO Comment SET ?', link_values, function (err, result) {
        if (err) console.log('error on',link_values);
      });
}

function save_subreddit(data){
    var sub_values = {id: data.subreddit_id, name : data.subreddit}
    con.query('INSERT INTO SubReddit SET ?', sub_values, function (err, result) {
        if (err) console.log('error on',sub_values);
      });
}

app.listen('3000', () => {
    console.log('Server started on port 3000');
});
