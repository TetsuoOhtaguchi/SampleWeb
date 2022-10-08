import { O } from 'ts-toolbelt'

/**
 * 引数として与えられたtype（オブジェクト）は各項目（deep階層でも）でnullを取れるようになる
 */
export type DeepPartial<T extends Record<string, any>> = O.Optional<
  T,
  keyof T,
  'deep'
>
