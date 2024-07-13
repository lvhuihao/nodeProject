// 主程序入口
import { objectsToCSV } from "./tools/process.js";
import fetchData from "./request/samsung_au_storelocator.js";
import Logger from './tools/logger.js'
import path from 'path';
// 获取参数
import { ParamsList } from "./tools/getLocation.js";

let dataPath: string = path.join(process.cwd(), './data/samsung_au_storelocator.csv');
async function main() {
    // 发送请求
    for (let i = 0; i < ParamsList.length; i++) {
        Logger.info(`start, ${ParamsList[i].lat}, ${ParamsList[i].lon}`)
        console.info(`start, ${ParamsList[i].lat}, ${ParamsList[i].lon}`)
        // 获取数据
        let tempData = await fetchData(ParamsList[i].lat, ParamsList[i].lon);
        if (tempData.length > 0) {
            // // 保存为csv
            await objectsToCSV(tempData, dataPath)
        } else {
            Logger.info('no data')
        }
        Logger.info(`end', ${ParamsList[i].lat}, ${ParamsList[i].lon}`)
    }
}

main()