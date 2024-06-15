import { Transformer } from 'markmap-lib'
import type { ITransformResult } from 'markmap-lib'
import type { IMarkmapJSONOptions } from 'markmap-view'
import { Markmap, deriveOptions } from 'markmap-view'

export function transform(svg: string | SVGElement, makrdownContent: string, jsonOptions?: IMarkmapJSONOptions | undefined): Markmap {
  const transformer: Transformer = new Transformer()
  const transformResult: ITransformResult = transformer.transform(makrdownContent)
  const markmapOptions = deriveOptions(jsonOptions)
  return Markmap.create(svg, markmapOptions, transformResult.root)
}
