import { CarData, Sequelize } from '../db';

export class DataSyncService {
  static async processData(data: CarDataType[]): Promise<ProcessingResult> {
    const names = data.map(entry => entry.name);

    const deleted = await DataSyncService.deleteEntries(names);

    let existingNames = await CarData.findAll({
      attributes: [ 'name' ]
    });

    existingNames = existingNames.map(item => item.name);

    const updated = existingNames.length;
    const created = names.length - existingNames.length;

    await DataSyncService.upsertEntries(data);

    return {
      created,
      updated,
      deleted,
    }
  }

  static async upsertEntries(data: CarDataType[]) {
    await CarData.bulkCreate(
      data,
      { updateOnDuplicate: ['date', 'lat', 'lng'] },
    );
  }

  static async deleteEntries(names: string[]) {
    return CarData.destroy({
      where: {
        name: {
          [Sequelize.Op.notIn]: names
        },
      },
    });
  }

  static async getDbStatus() {
    return CarData.count();
  }

  static async getExtendedDbStatus() {
    return CarData.findAll({
      attributes: [
        'name',
        'date',
        'lat',
        'lng',
      ]
    });
  }
}
