import Point, {IPoint} from "../models/pointsModel"

export async function getAllPointsService(): Promise<IPoint[]> {
    return await Point.find() as IPoint[];
};

export async function getPlaceIdByNamePointsService(namePoint: string): Promise<string | undefined> {
    const point = await Point.findOne({ "location.name": namePoint}) as IPoint;
    console.log(point.location);

    const placeId = point ? point.location.placeId : undefined;


    return placeId
}
