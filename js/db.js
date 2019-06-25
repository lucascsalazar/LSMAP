var db;
var dbReq;
var init = function() {};

$(function() {
    dbReq = indexedDB.open('LSMAP', 2);

    dbReq.onupgradeneeded = function(event) {
        db = event.target.result;
        var notes = db.createObjectStore('Teste', {autoIncrement: true});
    }
    
    dbReq.onsuccess = function(event) {
        db = event.target.result;
        init();
    }
    
    dbReq.onerror = function(event) {
        alert('error opening database ' + event.target.errorCode);
    }
});

function InserirTeste(data, callback) {
    var tx = db.transaction(['Teste'], 'readwrite');
    var store = tx.objectStore('Teste');
    store.add(data);
    
    tx.oncomplete = function() { if(callback != null) callback(); }
    tx.onerror = function(event) {
        alert('error: ' + event.target.errorCode);
    }
}

function ListarTeste(callback) {
    var tx = db.transaction(['Teste'], 'readonly');
    var store = tx.objectStore('Teste');
    var req = store.openCursor();
    var list = [];

    req.onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor != null) {
            list.push(cursor.value);
            cursor.continue();
        } else {
            callback(list);
        }
    }
    
    req.onerror = function(event) {
        alert('error: ' + event.target.errorCode);
    }
}