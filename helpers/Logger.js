import { promises as fs } from 'fs';
import dateFormat from 'dateformat';
import os from 'os';
import {v4 as uuid } from 'uuid'

const Logger = () => {
    
    const loggerFile = process.env.LOGGER_FILE_PATH;
    /**
     *  It's an emergency
     */
    const URGENT = 0;
    /**
     *  Immediate action required
     */
    const ALERT = 1;
    /**
     *  Critical conditions
     */
    const CRITICAL = 2;
    /**
     *  An error occurred
     */
    const ERROR = 3;
    /**
     *  Something unexpected happening
     */
    const WARNING = 4;
    /**
     *  Something worth nothing
     */
    const NOTICE = 5;
    /**
     *  Information, not an error
     */
    const INFO = 6;
    /**
     *  Debugging messages
     */
    const DEBUG = 7;

    const LOG_LEVELS = {
        URGENT: 'URGENT',
        ALERT: 'ALERT',
        CRITICAL: 'CRITICAL',
        ERROR: 'ERROR',
        WARNING: 'WARNING',
        NOTICE: 'NOTICE',
        INFO: 'INFO',
        DEBUG: 'DEBUG'
    };

    const requestData;
    const log = (logData, logLevel = INFO) => {
        


        return new Promise((resolve, reject) => {
            const logFormatedData = {
                log_time:"",
                level:logLevel,
                log_message:"config",
                description:"",
                url:"",
                module:"ConfigKeyMissing",
                requestId:"16119453406014557c4cc2b",
                log_host:"jerk-machine"
            }
        })
    }

    const LoggerInit = (req, res, next)=>{
        requestData.refererUid = req.query.refererUid;
        requestData.url = req.protocol + "://" + req.get('host') + req.originalUrl;
        requestData.log_host = os.hostname();
        requestData.requestId = os.hostname();
    }
}



exports.Logger = Logger;

