---
title: "C# MySQL Singleton DB Connection"
authors: me
tags: [c#, mysql]
date: 2017-01-10 16:39:13
---

# 소스

```cs
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;

namespace WebApplication.ClassFolder{

    public class DBConfig{
        private static string Server = "";
        private static string Database = "";
        private static string ID = "";
        private static string PASS = "";

        static string conf = "Server=" + Server + ";Database=" + Database + ";Uid=" + ID + ";Pwd=" + PASS;

        static MySqlConnection db;

        public static MySqlConnection Connection{
            get{
                if (db == null){
                    LazyInitializer.EnsureInitialized(ref db, CreateConnection);
                }
                return db;
            }
        }

        static MySqlConnection CreateConnection(){
            var db = new MySqlConnection(conf);

            db.Open();
            return db;
        }

        // 강제로 커넥션을 끊어야될 경우가 있을 때
        static void CloseConnection(){
            if(db != null) {
                db.Close();
                db.Dispose();
                db = null;
            }
        }

    }
}
```

# 예제

```cs
// get Connection
var db = DBConfig.Connection;
```
