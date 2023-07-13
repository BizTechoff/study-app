import { Allow, Entity, Fields, IdEntity, isBackend, remult } from "remult";
import { Roles } from "../users/roles";

@Entity<Lesson>('lessons', {
    caption: 'שיעורים',
    allowApiCrud: Roles.admin,
    allowApiRead: Allow.authenticated,
    saving: async row => {
        if (isBackend()) {
            if (row._.isNew()) {
                row.created = new Date()
                row.createdBy = remult.user?.id!
            }
            else {
                row.modified = new Date()
                row.modifiedBy = remult.user?.id!
            }
        }
    }
})
export class Lesson extends IdEntity {

    @Fields.string<Lesson>({ caption: 'נושא' })
    subject = ''

    @Fields.date<Lesson>({ caption: 'נוצר ב' })
    created!: Date

    @Fields.string<Lesson>({ caption: 'נוצר ע"י' })
    createdBy = ''

    @Fields.date<Lesson>({ caption: 'השתנה ב' })
    modified!: Date

    @Fields.string<Lesson>({ caption: 'השתנה ע"י' })
    modifiedBy = ''

}
