import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: Date; }
};

export type CurrentWeather = {
  __typename: 'CurrentWeather';
  clouds: Scalars['String']['output'];
  humidity: Scalars['Float']['output'];
  pressure: Scalars['Float']['output'];
  temp: Scalars['Float']['output'];
  wind?: Maybe<WindData>;
};

export type DataFrame = {
  __typename: 'DataFrame';
  timestamp: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type Query = {
  __typename: 'Query';
  hello?: Maybe<Scalars['String']['output']>;
  station?: Maybe<Station>;
  user?: Maybe<User>;
  weather?: Maybe<CurrentWeather>;
};


export type QueryStationArgs = {
  id: Scalars['String']['input'];
};


export type QueryWeatherArgs = {
  zip: Scalars['Float']['input'];
};

export type ReportedValues = {
  __typename: 'ReportedValues';
  flow?: Maybe<DataFrame>;
  gage?: Maybe<DataFrame>;
  height?: Maybe<DataFrame>;
  temp?: Maybe<DataFrame>;
};

export type Station = {
  __typename: 'Station';
  lat?: Maybe<Scalars['Float']['output']>;
  lon?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  usgsId: Scalars['String']['output'];
  values?: Maybe<ReportedValues>;
};

export type User = {
  __typename: 'User';
  email: Scalars['String']['output'];
  zipCode?: Maybe<Scalars['Int']['output']>;
};

export type WindData = {
  __typename: 'WindData';
  direction?: Maybe<Scalars['Float']['output']>;
  gust?: Maybe<Scalars['Float']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CurrentWeather: ResolverTypeWrapper<CurrentWeather>;
  DataFrame: ResolverTypeWrapper<DataFrame>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Query: ResolverTypeWrapper<{}>;
  ReportedValues: ResolverTypeWrapper<ReportedValues>;
  Station: ResolverTypeWrapper<Station>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  WindData: ResolverTypeWrapper<WindData>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CurrentWeather: CurrentWeather;
  DataFrame: DataFrame;
  DateTime: Scalars['DateTime']['output'];
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Query: {};
  ReportedValues: ReportedValues;
  Station: Station;
  String: Scalars['String']['output'];
  User: User;
  WindData: WindData;
};

export type CurrentWeatherResolvers<ContextType = any, ParentType extends ResolversParentTypes['CurrentWeather'] = ResolversParentTypes['CurrentWeather']> = {
  clouds?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  humidity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  pressure?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  temp?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  wind?: Resolver<Maybe<ResolversTypes['WindData']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DataFrameResolvers<ContextType = any, ParentType extends ResolversParentTypes['DataFrame'] = ResolversParentTypes['DataFrame']> = {
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  station?: Resolver<Maybe<ResolversTypes['Station']>, ParentType, ContextType, RequireFields<QueryStationArgs, 'id'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  weather?: Resolver<Maybe<ResolversTypes['CurrentWeather']>, ParentType, ContextType, RequireFields<QueryWeatherArgs, 'zip'>>;
};

export type ReportedValuesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReportedValues'] = ResolversParentTypes['ReportedValues']> = {
  flow?: Resolver<Maybe<ResolversTypes['DataFrame']>, ParentType, ContextType>;
  gage?: Resolver<Maybe<ResolversTypes['DataFrame']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['DataFrame']>, ParentType, ContextType>;
  temp?: Resolver<Maybe<ResolversTypes['DataFrame']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Station'] = ResolversParentTypes['Station']> = {
  lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  lon?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  usgsId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values?: Resolver<Maybe<ResolversTypes['ReportedValues']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zipCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WindDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['WindData'] = ResolversParentTypes['WindData']> = {
  direction?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  gust?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  speed?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CurrentWeather?: CurrentWeatherResolvers<ContextType>;
  DataFrame?: DataFrameResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  ReportedValues?: ReportedValuesResolvers<ContextType>;
  Station?: StationResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  WindData?: WindDataResolvers<ContextType>;
};

