//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ems_onscene.Models.EntityModels
{
    using System;
    using System.Collections.Generic;
    
    public partial class WebMenuSetting
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public WebMenuSetting()
        {
            this.WebMenuSetting1 = new HashSet<WebMenuSetting>();
        }
    
        public int Id { get; set; }
        public Nullable<int> ParentId { get; set; }
        public string MenuName { get; set; }
        public string URL { get; set; }
        public Nullable<int> Sorting { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WebMenuSetting> WebMenuSetting1 { get; set; }
        public virtual WebMenuSetting WebMenuSetting2 { get; set; }
    }
}
