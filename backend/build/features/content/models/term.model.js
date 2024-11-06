"use strict";
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 06-03-2024 05:30:31
 * @description This file is used to build mongoose model
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermSchemaFields = exports.TermSchema = exports.Term = void 0;
const mongoose_1 = require("mongoose");
const mongoose_fuzzy_searching_1 = __importDefault(require("mongoose-fuzzy-searching"));
const snapshots_model_1 = require("../../../common/models/snapshots.model");
const optimization_utilities_1 = require("../../../utilities/data/db/optimization.utilities");
const mogodb_helpers_1 = require("../../../utilities/helpers/mogodb.helpers");
/**
 * Represents the embedded objects of the TermSchema.
 */
const EmbeddedObjects = {
    snapshots: {
        type: {
            created_by: {
                type: snapshots_model_1._UserSnapshotSchemaFields,
                default: null
            },
            taxonomy: {
                type: {
                    _id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Taxonomy' },
                    slug: { type: String },
                    name: { type: String },
                    is_hierarchical: { type: Boolean, default: false },
                    is_multi: { type: Boolean, default: false }
                },
                default: null,
            }
        },
        _id: false // Disable _id for this subdocument
    },
    insights: {
        type: {
            article_count: { type: Number, default: 0 }
        },
        _id: false // Disable _id for this subdocument
    }
};
/**
 * Represents the fields of the Term Schema.
 */
const TermSchemaFields = Object.assign(Object.assign({ 
    /**
     * Inherited from ICreatable
     */
    app: { type: String, required: true }, company: { type: String, default: null }, created_by: { type: mongoose_1.Schema.Types.String, required: true }, created_by_original_user: {
        type: snapshots_model_1._UserSnapshotSchemaFields,
        default: null
    }, is_deleted: { type: Boolean, default: false }, deleted_at: { type: Date, default: null }, tags: snapshots_model_1._ItemTagsSchemaFields, updates: [snapshots_model_1._ItemUpdateSchemaFields], 
    /**
     * Inherited from IHasSearchMeta
     */
    search_meta: { type: String } }, EmbeddedObjects), { 
    /**
     * Specific to Entity
     */
    taxonomy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Taxonomy', required: true }, parent: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Term' }, children: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Term' }], slug: { type: String }, name: { type: String }, 
    //
    description: { type: String }, description_unformatted: { type: String }, description_structured: { type: mongoose_1.Schema.Types.Mixed } });
exports.TermSchemaFields = TermSchemaFields;
/**
 * The Mongoose schema for the Term model.
 *
 * @remarks
 * This schema defines the fields and their types for the Term model.
 *
 */
const TermSchema = new mongoose_1.Schema(TermSchemaFields, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
exports.TermSchema = TermSchema;
// Apply the middleware to the schema before any `find` operation
TermSchema.pre('find', optimization_utilities_1.trackUsedFieldsDBMiddleware);
TermSchema.pre('findOne', optimization_utilities_1.trackUsedFieldsDBMiddleware);
TermSchema.pre('findOneAndUpdate', optimization_utilities_1.trackUsedFieldsDBMiddleware);
/**
 * The Mongoose fuzzy search plugin for the TermSchema.
 */
TermSchema.plugin(mongoose_fuzzy_searching_1.default, {
    fields: [
        {
            name: 'search_meta'
        }
    ]
});
/**
 * The Mongoose model for the Term model.
 *
 * @remarks
 * This model is used to perform CRUD operations on the Term model.
 *
 */
const Term = (mongoose_1.models === null || mongoose_1.models === void 0 ? void 0 : mongoose_1.models.Term) || (0, mongoose_1.model)('Term', TermSchema);
exports.Term = Term;
/**
 * Ensure indexes
 */
(0, mogodb_helpers_1.ensureIndexes)(Term);
//# sourceMappingURL=term.model.js.map