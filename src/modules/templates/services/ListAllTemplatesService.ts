import clientPromise from '../../../../lib/mongodb';

interface IServiceData {
  page: number;
  limit: number;
  order: string;
  search: string;
}

export class ListAllTemplatesService {
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
      .skip((page - 1 < 0 ? 0 : page - 1) * limit)
      .limit(limit)
      .toArray();

    const total = await db.collection('templates').countDocuments({
      $or: [
        { 'templateConfiguration.name': { $regex: search, $options: 'i' } },
        {
          'templateConfiguration.description': {
            $regex: search,
            $options: 'i',
          },
        },
      ],
    });

    return {
      templates: JSON.parse(JSON.stringify(templates)),
      limit,
      page,
      total,
      search,
      order,
    };
  }
}
