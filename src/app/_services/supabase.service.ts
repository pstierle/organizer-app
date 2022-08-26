import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, from, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export type FilterOperator =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'like'
  | 'ilike'
  | 'is'
  | 'in'
  | 'cs'
  | 'cd'
  | 'sl'
  | 'sr'
  | 'nxl'
  | 'nxr'
  | 'adj'
  | 'ov'
  | 'fts'
  | 'plfts'
  | 'phfts'
  | 'wfts';

export type FindFilter = [
  column: string,
  op: FilterOperator,
  value: string | number | boolean | null | undefined
];

export type FindOrder = [column: string, ascending?: boolean];

export class BaseService<T> {
  protected supabase: SupabaseClient;
  protected resource: string;

  constructor(resource: string) {
    this.resource = resource;
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  findById(id: string, select = '*'): Observable<T> {
    const query = this.supabase
      .from(this.resource)
      .select(select)
      .match({ id })
      .single();
    return from(query).pipe(map((res) => res.body as T));
  }

  findByIdWithFilter(
    id: number,
    filters: FindFilter[],
    select = '*'
  ): Observable<T> {
    const query = this.supabase
      .from(this.resource)
      .select(select)
      .match({ id });
    filters.forEach(([column, op, value]) => {
      query.filter(column, op, value);
    });
    return from(query.single()).pipe(map((res) => res.body as T));
  }

  find(
    select = '*',
    filters: FindFilter[] = [],
    range: number[] | undefined = undefined,
    orders: FindOrder[] = []
  ): Observable<T[]> {
    const query = this.supabase.from(this.resource).select(select);

    filters.forEach(([column, op, value]) => {
      query.filter(column, op, value);
    });

    orders.forEach(([column, ascending]) => {
      query.order(column, { ascending });
    });

    if (range) query.range(range[0], range[1]);

    return from(query).pipe(map((res) => res.body as T[]));
  }

  count(filters: FindFilter[]) {
    const query = this.supabase.from(this.resource).select('*', {
      count: 'exact',
      head: true,
    });

    filters.forEach(([column, op, value]) => {
      query.filter(column, op, value);
    });

    return from(query).pipe(map((res) => res.count));
  }

  create(model: Partial<T>): Observable<T> {
    const query = this.supabase
      .from(this.resource)
      .insert({ ...model })
      .single();
    return from(query).pipe(map((res) => res.body as T));
  }

  createMany(models: Partial<T>[]): Observable<T[]> {
    const query = this.supabase.from(this.resource).insert(models);
    return from(query).pipe(map((res) => res.body as T[]));
  }

  delete(id: string): Observable<T> {
    const query = this.supabase
      .from(this.resource)
      .delete()
      .eq('id', id)
      .single();
    return from(query).pipe(map((res) => res.body as T));
  }

  deleteMany(filters: FindFilter[]): Observable<T[]> {
    const query = this.supabase.from(this.resource).delete();
    filters.forEach(([column, op, value]) => {
      query.filter(column, op, value);
    });

    return from(query).pipe(map((res) => res.body as T[]));
  }

  update(id: string, data: Partial<T>): Observable<T> {
    const query = this.supabase
      .from(this.resource)
      .update({ ...data })
      .eq('id', id)
      .single();
    return from(query).pipe(map((res) => res.body as T));
  }

  protected returnList(query: any): Observable<T[]> {
    return from(query).pipe(map((res: any) => res.body as T[]));
  }

  protected returnSingle(query: any): Observable<T> {
    return from(query).pipe(map((res: any) => res.body?.[0] as T));
  }
}
