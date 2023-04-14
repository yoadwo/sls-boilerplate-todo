export default {
    type: "object",
    properties: {
      title: { type: 'string'},
      description: { type: 'string'},
      status: { type: 'boolean'},
    },
    required: [],
    additionalProperties: false,
  } as const;