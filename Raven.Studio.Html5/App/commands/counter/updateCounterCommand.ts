﻿import commandBase = require("commands/commandBase");
import database = require("models/database");
import counter = require("models/counter/counter");
import counterGroup = require("models/counter/counterGroup");
import counterStorage = require("models/counter/counterStorage");
import appUrl = require("common/appUrl");

class updateCounterCommand extends commandBase {

    /**
    * @param ownerDb The database the collections will belong to.
    */
    constructor(private storage:counterStorage, private editedCounter: counter,private delta:number) {
        super();

    }

    execute(): JQueryPromise<counter[]> {
        var args = {
            counterName: this.editedCounter.id(),
            group: this.editedCounter.group(),
            delta:this.delta
        };

        var url = "/change";
        var selector = (dtos: counterDto[]) => dtos.map(d => new counter(d));
        return this.query(url, args, this.storage, selector);
    }
}

export = updateCounterCommand;  