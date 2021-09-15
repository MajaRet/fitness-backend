/* tslint:disable:no-empty */
import Program from '../models/ProgramModel.js';

// Translate filters into a database query.
// TODO: Type correctly.
const buildFilterQuery: any = (filter: any) => {
  const query: any = {};
  if (filter.keyword && filter.keyword.length !== 0) {
    query.$or = [
      { title: { $regex: `.*${filter.keyword}.*`, $options: 'i' } },
      { description: { $regex: `.*${filter.keyword}.*`, $options: 'i' } },
    ];
  }
  if (filter.maxDuration > 0 || filter.minDuration > 0) {
    query.duration = {};
  }
  if (filter.maxDuration && filter.maxDuration > 0) {
    query.duration.$lte = filter.maxDuration;
  }
  if (filter.minDuration && filter.minDuration > 0) {
    query.duration.$gte = filter.minDuration;
  }
  if (filter.favorite === 'true') {
    query.isFavorite = true;
  }
  if (
    filter.difficulty &&
    ['hard', 'intermediate', 'beginner'].includes(filter.difficulty)
  ) {
    query.difficulty = filter.difficulty;
  }
  return query;
};

// TODO Type request and response
export const listPrograms = async (req: any, res: any, next: any) => {
  const offset = parseInt(req.query.offset, 10);
  const pageLimit = parseInt(req.query.limit, 10);
  const query = buildFilterQuery(req.query);
  let programs;
  programs = await Program.find(query)
    .skip(offset)
    .limit(pageLimit)
    .lean()
    .catch(next);
  res.json(programs);
};
