import fs from 'fs';
import path from 'path';
import Logger from './logger.js'
/**
 * 写入csv头文件
 * @param {Array<string>} keys 
 */
async function saveCSVHeader(keys, filePath) {
    let content = keys.join(',') + '\n'
    await readOrCreateFile(content, filePath)
}

/**
 * 将string写入csv文件
 * @param {string} content 
 * @returns 
 */
async function readOrCreateFile(content, filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    // 文件不存在，创建文件
                    fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
                        if (err) {
                            console.error('Error creating directory:', err);
                            return;
                        }
                        let header = keys.join(',') + "\n"

                        fs.writeFile(filePath, header + content + '\n', (err) => {
                            if (err) {
                                Logger.error('Error creating file')
                                console.error('Error creating file:', err);
                            } else {
                                Logger.info('File created successfully')
                                console.log('File created successfully');
                            }
                        });
                    });
                    resolve()
                } else {
                    console.error('Error reading file:', err);
                    reject()
                }
            } else {
                // 文件存在，追加内容
                fs.appendFile(filePath, content + '\n', (err) => {
                    if (err) {
                        Logger.error('Error appending to file')
                        console.error('Error appending to file:', err);
                        reject()
                    } else {
                        Logger.info('Content appended to file')
                        console.log('Content appended to file');
                        resolve()
                    }
                });
            }
        });
    })
}
let keys = []
/**
 * 将对象转换为csv文件的string类型
 * @param {Object} objects 
 * @returns 
 */
async function objectsToCSV(objects, filePath) {
    if (keys.length <= 0) {
        keys = Object.keys(objects[0])
        await saveCSVHeader(keys, filePath)
    }
    // 构建 CSV 内容
    const csvContent = objects.map(obj => {
        // 对每个对象，按照 headers 的顺序取出值，并用逗号拼接
        const values = keys.map(key => {
            let value = obj[key];

            // Convert arrays or objects to JSON strings
            if (Array.isArray(value) || typeof value === 'object') {
                value = JSON.stringify(value);
            }

            // Handle special characters (e.g., commas)
            value = handleSpecialCharacters(value);

            return value;
        });
        // 将值数组拼接成 CSV 行，并返回
        return values.join(",");
    }).join("\n"); // 使用换行符连接所有行

    function handleSpecialCharacters(value) {
        // If value is a string and contains commas, replace commas with spaces
        if (typeof value === 'string' && value.includes(',')) {
            return value.replace(/,/g, '｜');
        }
        return value;
    }

    return readOrCreateFile(csvContent, filePath);
}

export { objectsToCSV }