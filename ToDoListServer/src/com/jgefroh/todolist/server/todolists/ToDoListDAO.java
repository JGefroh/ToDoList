package com.jgefroh.todolist.server.todolists;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NamedQuery;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.jgefroh.server.core.AbstractGenericDAO;

/**
 * @author Joseph Gefroh
 */
@Stateless
@NamedQuery(name = "todolist.getForOwner",
            query = "select T from ToDoList T where T.ownerId = :ownerId")
public class ToDoListDAO extends AbstractGenericDAO {
    @PersistenceContext
    private EntityManager entityManager;
    
    @Override
    public EntityManager getEntityManager() {
        return entityManager;
    }
    
    public ToDoList getForOwner(final String ownerId) {
        Query query = entityManager.createNamedQuery("todolist.getForOwner", ToDoList.class);
        query.setParameter("ownerId", ownerId);
        
        List<ToDoList> results = query.getResultList();
        return results.isEmpty() ? null : results.get(0);
    }
}
