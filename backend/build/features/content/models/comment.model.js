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
exports.CommentSchemaFields = exports.CommentSchema = exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const mongoose_fuzzy_searching_1 = __importDefault(require("mongoose-fuzzy-searching"));
const snapshots_model_1 = require("../../../common/models/snapshots.model");
const optimization_utilities_1 = require("../../../utilities/data/db/optimization.utilities");
const mogodb_helpers_1 = require("../../../utilities/helpers/mogodb.helpers");
/**
 * Represents the embedded objects of the CommentSchema.
 */
const EmbeddedObjects = {
    snapshots: {
        type: {
            created_by: {
                type: snapshots_model_1._UserSnapshotSchemaFields,
                default: null
            },
            article: {
                type: {
                    _id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Article', required: true },
                    slug: { type: String, required: true },
                    title: { type: String, required: true }
                },
                default: null,
                _id: false // Disable _id for this subdocument
            }
        },
        _id: false // Disable _id for this subdocument
    }
};
/**
 * Represents the fields of the Comment Schema.
 */
const CommentSchemaFields = Object.assign(Object.assign({ 
    /**
     * Inherited from ICreatable
     */
    app: { type: String, required: false, default: null }, company: { type: String, default: null }, created_by: { type: mongoose_1.Schema.Types.String, required: false, default: null }, created_by_original_user: {
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
    parent: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Comment', required: true }, children: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Comment', required: true }], article: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Article', required: true }, slug: { type: String }, 
    // 
    body: { type: String }, body_unformatted: { type: String }, body_structured: { type: mongoose_1.Schema.Types.Mixed } });
exports.CommentSchemaFields = CommentSchemaFields;
/**
 * The Mongoose schema for the Comment model.
 *
 * @remarks
 * This schema defines the fields and their types for the Comment model.
 *
 */
const CommentSchema = new mongoose_1.Schema(CommentSchemaFields, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
exports.CommentSchema = CommentSchema;
// Apply the middleware to the schema before any `find` operation
CommentSchema.pre('find', optimization_utilities_1.trackUsedFieldsDBMiddleware);
CommentSchema.pre('findOne', optimization_utilities_1.trackUsedFieldsDBMiddleware);
CommentSchema.pre('findOneAndUpdate', optimization_utilities_1.trackUsedFieldsDBMiddleware);
/**
* The Mongoose fuzzy search plugin for the CommentSchema.
*/
CommentSchema.plugin(mongoose_fuzzy_searching_1.default, {
    fields: [
        {
            name: 'search_meta',
        },
    ]
});
/**
 * The Mongoose model for the Comment model.
 *
 * @remarks
 * This model is used to perform CRUD operations on the Comment model.
 *
 */
const Comment = (mongoose_1.models === null || mongoose_1.models === void 0 ? void 0 : mongoose_1.models.Comment) || (0, mongoose_1.model)('Comment', CommentSchema);
exports.Comment = Comment;
/**
 * Ensure indexes
 */
(0, mogodb_helpers_1.ensureIndexes)(Comment);
//# sourceMappingURL=comment.model.js.map