import clientPromise from '../../../../lib/mongodb';

interface IServiceData {
  page: number;
  limit: number;
  order: string;
  search: string;
}

export class ListAllTemplates {
  public async execute({ page, limit, order, search }: IServiceData) {
    const mongoClient = await clientPromise;
    const db = await mongoClient.db();
    const templates = await db
      .collection('templates')
      .find({
        $or: [
          { 'templateConfiguration.name': { $regex: search, $options: 'i' } },
          {
            'templateConfiguration.description': {
              $regex: search,
              $options: 'i',
            },
          },
        ],
      })
      .sort({ createdAt: order === 'asc' ? 1 : -1 })
      .skip(page * limit)
      .limit(limit)
      .toArray();

    return templates;
  }
}
