package com.jgefroh.todolist.server.todolists;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.Query;

import com.jgefroh.todolist.server.core.ToDoListGenericDAO;

/**
 * @author Joseph Gefroh
 */
@Stateless
public class ToDoListDAO extends ToDoListGenericDAO {
    public ToDoList getForOwner(final String ownerId) {
        Query query = getEntityManager().createNamedQuery("todolist.getForOwner", ToDoList.class);
        query.setParameter("ownerId", ownerId);
        
        List<ToDoList> results = query.getResultList();
        return results.isEmpty() ? null : results.get(0);
    }
}
