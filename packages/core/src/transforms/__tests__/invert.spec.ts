import { invert } from '../invert'
import { TransformFactoryContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })

describe('invert', () => {
    let dirCtx: TransformFactoryContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, warn: jest.fn }
    })

    test('keyword "invert"', () => {
        const res = invert({ invert: 'true' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('missing', () => {
        const res = invert({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            //@ts-expect-error
            const res = invert({ invert: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = invert({ invert: '' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        test('true', () => {
            const res = invert({ invert: 'true' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })
    })

    describe('transform', () => {
        let img: Sharp
        beforeEach(() => {
            img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))
        })

        test('empty', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([invert({ invert: '' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('true', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([invert({ invert: 'true' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })
    })
})