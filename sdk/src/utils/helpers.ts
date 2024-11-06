export default class JouryCMSSdkHelpers {
  public getEdge: <
    Edge extends Levelup.CMS.V1.Utils.Api.Response.TResponseEdge,
    E extends keyof Edge
  >(
    edge: Partial<Edge> | undefined,
    entity: E,
    _id?: string | null
  ) => Edge[E][keyof Edge[E]] | undefined = (edge, entity, _id) => {
    if (!_id) return undefined;
    return ((edge ?? ({} as any))[entity] ?? {})[_id];
  };

  public isValidId(id: string | null | undefined): boolean {
    return !!id && id.length === 24;
  }
}

