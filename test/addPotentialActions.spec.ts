import test from 'tape'

/** @ts-expect-error - explicit .ts file for coverage calculation */
import addPotentialActions from '../lib/addPotentialActions.ts'

test('addPotentialActions', (assert) => {
    assert.plan(6)

    assert.deepEqual(addPotentialActions(), {}, 'defaults to empty message')

    assert.deepEqual(
        addPotentialActions({}),
        {},
        'does not modify message without actions'
    )

    assert.deepEqual(
        addPotentialActions({}, []),
        {},
        'does not modify message with empty actions'
    )

    assert.deepEqual(
        addPotentialActions({}, [{ label: 'label', href: 'href' }]),
        {
            potentialAction: [
                {
                    '@type': 'OpenUri',
                    name: 'label',
                    targets: [
                        {
                            os: 'default',
                            uri: 'href'
                        }
                    ]
                }
            ]
        },
        'adds actions to message'
    )

    assert.throws(
        () => addPotentialActions({}, {}),
        'throws when links not an array'
    )

    assert.throws(
        () => addPotentialActions({}, ['test']),
        'throws when links are invalid'
    )
})
