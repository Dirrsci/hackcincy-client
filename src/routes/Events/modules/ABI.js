module.exports = [
  {
    'constant': true,
    'inputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'name': 'events',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'getEvents',
    'outputs': [
      {
        'name': '',
        'type': 'address[]'
      }
    ],
    'payable': false,
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'owner',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_eventName',
        'type': 'bytes32'
      },
      {
        'name': '_price',
        'type': 'uint256'
      },
      {
        'name': '_numTickets',
        'type': 'uint256'
      }
    ],
    'name': 'createEvent',
    'outputs': [],
    'payable': false,
    'type': 'function'
  },
  {
    'inputs': [],
    'payable': false,
    'type': 'constructor'
  }
]
