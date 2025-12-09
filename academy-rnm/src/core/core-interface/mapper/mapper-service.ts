export abstract class MapperService<I, O>{
  protected abstract mapTo(params: I): O;
  protected abstract mapFrom(params: O): I;
}
