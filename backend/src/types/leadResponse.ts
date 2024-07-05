export type leadResponse = {
  id: number;
  name: string;
  price: number;
  responsible_user_id: number;
  group_id: number;
  status_id: number;
  pipeline_id: number;
  loss_reason_id: number | null;
  created_by: number;
  updated_by: number;
  created_at: number;
  updated_at: number | null;
  closed_at: number | null;
  closest_task_at: number | null;
  is_deleted: boolean;
  custom_fields_values: number | null;
  score: number | null;
  account_id: number | null;
  labor_cost: number | null;
  _links: {
    self: {
      href: string;
    };
  };
  _embedded: {
    tags: string[];
    companies: [
      {
        id: number;
        _links: {
          self: {
            href: string;
          };
        };
      },
    ];
    contacts: [
      {
        id: number;
        is_main: boolean;
        _links: {
          self: {
            href: string;
          };
        };
      },
    ];
  };
};
