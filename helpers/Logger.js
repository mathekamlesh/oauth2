import { promises as fs } from 'fs';
import dateFormat from 'dateformat';

module.export = () => {
    
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

    const LOG_LEVELS = [URGENT];

    const log = (logLevel,logData) => {
        return new Promise((resolve, reject) => {
            const logFormatedData = {
                log_time:"",
                level:"CRITICAL",
                log_message:"config",
                description:"",
                url:"",
                module:"ConfigKeyMissing",
                requestId:"16119453406014557c4cc2b",
                log_host:"jerk-machine"
            }
        })
    }
}
