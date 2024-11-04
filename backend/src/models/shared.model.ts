/**
 * @description This file is used to build mongoose model
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 07-03-2024 23:23:09
 */


type _Entity = Levelup.V2.Payment.Spc.Entity.ZonePricing;
type StrictSchemaDefinition<T = undefined, EnforcedDocType = any> = Levelup.V2.Utils.Mongodb.StrictSchemaDefinition<T, EnforcedDocType>;


export const _SpcZonePricingSchemaFields: StrictSchemaDefinition<Omit<_Entity, '_id' | 'created_at' | 'updated_at'>> = {

  enterprise: {
    express: {
      home: { type: Number, default: 0 },
      desk: { type: Number, default: 0 },
      return: { type: Number, default: 0 }
    },
    economic: {
      home: { type: Number, default: 0 },
      desk: { type: Number, default: 0 },
      return: { type: Number, default: 0 }
    }
  },
  particular: {
    express: {
      home: { type: Number, default: 0 },
      desk: { type: Number, default: 0 },
      return: { type: Number, default: 0 }
    },
    economic: {
      home: { type: Number, default: 0 },
      desk: { type: Number, default: 0 },
      return: { type: Number, default: 0 }
    }
  },
  classic: {
    home: { type: Number, default: 0 },
    desk: { type: Number, default: 0 },
    return: { type: Number, default: 0 }
  },
  b2b: {
    home: { type: Number, default: 0 },
    desk: { type: Number, default: 0 },
    specifications: { type: Number, default: 0 },
    submission: { type: Number, default: 0 },
    with_acknowledgement: { type: Number, default: 0 },
    return: { type: Number, default: 0 }
  },
  freight: {
    home: { type: Number, default: 0 },
    desk: { type: Number, default: 0 },
    return: { type: Number, default: 0 }
  }

};