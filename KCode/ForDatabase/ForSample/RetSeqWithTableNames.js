import { DataTypes } from "sequelize";
import path from "path";

import Configjson from '../../../src/Config.json' assert { type: 'json' };
import tableNameJson from '../../../src/ksSample/tableName.json' assert { type: 'json' };

import { StartFunc as StartFuncInitializeSequelize } from "../../../src/kSequelize/initializeSequelize.js";

let StartFunc = async () => {
    let LocalTableName = tableNameJson.tableName;
    let LocaltableAndColumns = Configjson.jsonConfig.tableAndColumns.children;

    const sequelize = await StartFuncInitializeSequelize();

    let LocalColumnsNeeded = LocaltableAndColumns.find(element => element.name === LocalTableName);

    Object.entries(LocalColumnsNeeded.fileData).forEach(
        ([key, value]) => {
            if (value.type === "STRING") {
                value.type = DataTypes.STRING;
            };

            if (value.type === "NUMBER") {
                value.type = DataTypes.NUMBER;
            };
        }
    );

    sequelize.define(path.parse(LocalTableName).name, LocalColumnsNeeded.fileData, { freezeTableName: true });

    return await sequelize;
};

export { StartFunc };

